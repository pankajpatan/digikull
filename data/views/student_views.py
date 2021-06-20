import decimal
from rest_framework import response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer
from data.models import Student ,Grades,Attendence,Session,Batch
from data.serializer import StudentSerializer,GradesSerealizer,AttendenceSerializer
from django.core.files.storage import FileSystemStorage
from rest_framework import status
import pandas as pd 
import csv
from datetime import datetime
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_attendence(request):
    data = request.data
    batch = Batch.objects.get(_id=data['batch'])
    file = request.FILES.get('myfile')
    fs = FileSystemStorage()
    filename = fs.save(file.name, file)
    uploaded_file_path = fs.path(filename)
    # TO MAINTAIN THE SHEET COUNT
    Session.objects.create(
        name = "meeting held"
    )
    f = open(uploaded_file_path)
    reader = csv.reader((line.replace('\0','') for line in f), delimiter="\t")
    l = list(reader)
    for i in range(len(l)):
        for j in range(len(l[i])):
            if l[i][j].startswith('DK'):
                try:
                    student,created = Student.objects.get_or_create(
                        name = l[i][0],
                        email = l[i][4],
                        batch = batch
                    )
                except :
                    return response("there is something wrong",status=status.HTTP_400_BAD_REQUEST)
                
            
                attendence , created = Attendence.objects.get_or_create(
                        join_time = datetime.strptime(l[i][1],"%m/%d/%Y, %H:%M:%S %p"),
                        leave_time = datetime.strptime(l[i][2],"%m/%d/%Y, %H:%M:%S %p"),
                        duration = l[i][3],
                        student = student
                    )
                
        
    return Response("data saved succesfully")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_grades(request):
    data = request.data
    batch = Batch.objects.get(_id=data['batch'])
    file =data['myfile']
    fs = FileSystemStorage()
    filename = fs.save(file.name,file)
    uploaded_file_path = fs.path(filename)
    with open(uploaded_file_path) as f:
        reader = csv.reader((line.replace('\0','') for line in f), delimiter = ',')
        for row in reader:
            if row[2].startswith('DK'):

                try :
                    student,created = Student.objects.get_or_create(
                    name = row[0],
                    email = row[2],
                    batch =batch
                )
                except :
                    return response("something wrong with data",status=status.HTTP_400_BAD_REQUEST)

               
                for i in range(3,len(row),3):
                      if row[2].startswith('DK'):
                          

                    # try: 

                            grades,created = Grades.objects.get_or_create(
                             
                                feedback = row[i+2],
                                student = student
                            )
                            if row[i] != '':
                                grades.marks = float(row[i])
                            if row[i+1] != '':
                                grades.points = float(row[i+1])
                            grades.save()


                            
                    # except:
                    #     return response("something went wrong", status = status.HTTP_400_BAD_REQUEST)
                      
    return Response("data saved succesfully")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request,pk):
    student = Student.objects.filter(batch_id=pk)
    for st in student:
        b= st.grades_set.all()
        total_grades =0
        for i in b:
            if i.marks != None:

                total_grades += i.marks
        st.total_grades = total_grades

        a =st.attendence_set.all()
        attend = len(a)
        session = Session.objects.all()
        total_sessions = len(session)
        percent = (attend/250)*total_sessions
        st.total_class_attended = percent
        st.save()
    serializer = StudentSerializer(student,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_grades(request,pk):
    student = Student.objects.get(_id=pk)
    print(student,'student')
    grades = student.grades_set.all()
    attendence = student.attendence_set.all()
    data ={
        'grades' : grades,
    }
    
    serializer = GradesSerealizer(data['grades'],many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_attendence(request,pk):
    student = Student.objects.get(_id=pk)
   
    attendence = student.attendence_set.all()
    data ={
        'attendence' : attendence,
        

    }
    
    serializer = AttendenceSerializer(data['attendence'],many=True)
    return Response(serializer.data)
