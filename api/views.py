from django.shortcuts import render
from .models import Todo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .serializers import TodoSerializer

class TodoList(APIView):
    def get(self, request):
        # Get all Todos
        todos = Todo.objects.all()

        # Serialize them into JSON
        todo_json = TodoSerializer(todos, many=True)

        return Response(todo_json.data)

    def post(self, request):

        # this will allow you to convert from JSON into a todo object
        todo = TodoSerializer(data=request.data)

        # if it's a valid Todo model, save it
        if todo.is_valid():
            todo_obj = todo.save()      # can't do commit=False here because its a serializer
            todo_obj.completed = False
            todo_obj.url = reverse('single-todo', args={'todo_id': todo_obj.id})
            todo_obj.save()
        # serialize the data into JSON and return it
        return Response(todo.data)

    def delete(self, request):
        Todo.objects.all().delete()
        return Response(None)

class TodoOne(APIView):
    pass