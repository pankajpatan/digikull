from django.urls import path
from data.views.student_views import *

urlpatterns = [

    path('upload_attendence/<str:pk>/', upload_attendence, name='upload_attendence'),
    path('upload_grades/<str:pk>/', upload_grades, name='upload_grades'),
    path('get_students/<str:pk>/', get_students, name='get_students'),
    path('get_student_attendence/<str:pk>/', get_student_attendence, name='get_student_attendence'),
    path('get_student_grades/<str:pk>/', get_student_grades, name='get_student_grades'),

]