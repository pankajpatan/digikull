from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User

from data.models import Batch
from data.serializer import BatchSerializer
from data.models import Batch
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_batches(request):
    batch = Batch.objects.all()
    serializer = BatchSerializer(batch, many=True)
    return Response(serializer.data)

# create batch 
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_batches(request):
    data = request.data
    print(data)
    id = data['class_cordinator']
    user = User.objects.get(id=id)
    batch = Batch.objects.create(
        name = data['name'],
        class_cordinator = user
    )

    serializer = BatchSerializer(batch, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_batches(request, pk):
    data = request.data
    id = data['class_cordinator']
    user = User.objects.get(id=id)
    batch = Batch.objects.get(_id=pk)

    batch.name = data['name']
    batch.class_cordinator = user

    batch.save()

    serializer = BatchSerializer(batch, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_batches(request):
    batch = Batch.objects.filter(class_cordinator=request.user)
    serializer = BatchSerializer(batch, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def single_batch(request,pk):
    batch = Batch.objects.get(_id=pk)
    serializer = BatchSerializer(batch, many=False)
    return Response(serializer.data)