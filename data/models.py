from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import User

# Create your models here.
class Batch(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True,default=None)
    class_cordinator = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True,default=None)
    _id = models.AutoField(primary_key=True, editable=False)

class Student(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)
    batch = models.ForeignKey(Batch,on_delete=models.SET_NULL,null=True)
    email = models.CharField(max_length=200,null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    total_grades = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    total_class_attended = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)


class Grades(models.Model):
    title = models.CharField(max_length=200,blank=True,null=True)
    marks = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    points = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    feedback = models.CharField(max_length=200,null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    student =models.ForeignKey(Student,on_delete=models.SET_NULL,null=True)

class Attendence(models.Model):
    meeting_title = models.CharField(max_length=200,blank=True,null=True)
    leave_time = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    join_time = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    duration = models.CharField(max_length=200,null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    student =models.ForeignKey(Student,on_delete=models.SET_NULL,null=True)

# this model is created for just make count of number of cllases
class Session(models.Model):
    name = models.CharField(max_length=200,null=True,blank=True)





