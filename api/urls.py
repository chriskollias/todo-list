from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.TodoList.as_view()),
    path('<todo_id>/', views.TodoOne.as_view(), name='single-todo'),

]