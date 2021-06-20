from django.urls import path
from data.views.batch_views import *




urlpatterns = [

    path('get_batches/', get_batches, name='get_batches'),
    path('my_batches/', my_batches, name='my_batches'),
    path('create_batch/', create_batches, name='create_batch'),
    path('batch_update/<str:pk>/', update_batches, name='batch_update'),
    path('single_batch/<str:pk>/', single_batch, name='single_batch'),



]