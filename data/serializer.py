from django.db import models
from django.db.models.base import Model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Batch,Student,Grades,Attendence


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class AttendenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendence
        fields = '__all__'

class GradesSerealizer(serializers.ModelSerializer):

    class Meta:
        model = Grades
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    # grades = serializers.SerializerMethodField(read_only=True)
    # attendence = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields ='__all__'
    # def get_grades(self, obj):
    #     grades = obj.Grades.all()
    #     serializer = GradesSerealizer(grades, many=True)
    #     return serializer.data
    
    # def get_attendence(self, obj):
    #     attendence = obj.Attendence.all()
    #     serializer = GradesSerealizer(attendence, many=True)
    #     return serializer.data
    


class BatchSerializer(serializers.ModelSerializer):
    # student = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model =Batch
        fields= '__all__'

    # def get_student(self, obj):
    #     student = obj.Student.all()
    #     serializer = StudentSerializer(student, many=True)
    #     return serializer.data


