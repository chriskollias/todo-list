from django.shortcuts import render
from .models import Todo
from rest_framework.views import APIView

class TodoList(APIView):
    def post(self, request):
        

class TodoOne(APIView):
    pass