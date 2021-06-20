  
from django.urls import path
from data.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),
    path('get_users/', views.getUsers, name='get_users'),

]
