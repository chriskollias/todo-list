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
        serializer = TodoSerializer(todos, many=True)

        return Response(serializer.data, status=200)

    def post(self, request):
        # this will allow you to convert from JSON into a todo object
        serializer = TodoSerializer(data=request.data)

        # if it's a valid Todo model, save it
        if serializer.is_valid():
            todo_obj = serializer.save()      # can't do commit=False here because its a serializer
            todo_obj.completed = False
            todo_obj.id = todo_obj.id
            todo_obj.save()
            # serialize the data into JSON and return it
            return Response(serializer.data, status=201)
        # if not valid, you want to return status code 400 for bad request
        return Response(None, status=400)

    def delete(self, request):
        Todo.objects.all().delete()
        return Response(None, status=204)

class TodoOne(APIView):
    def get(self, request, todo_id):
        try:
            todo = Todo.objects.get(pk=todo_id)

            # serialize the todo into JSON
            serializer = TodoSerializer(todo)

            # Return the JSON data
            return Response(serializer.data, status=200)
        except Todo.DoesNotExist:
            # if not valid, you want to return status code 400 for bad request
            return Response(None, status=400)

    # patch is a request for editing an existing object
    def patch(self, request, todo_id):
        try:
            todo = Todo.objects.get(pk=todo_id)

            # partial means we may be working with partial data (e.g. missing fields), so we just update what fields we
            # are given. Also we pass it data since we are receiving data, like as in a post request
            serializer = TodoSerializer(data=request.data, instance=todo, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(None, status=400)
        except Todo.DoesNotExist:
            return Response(None, status=400)

    def delete(self, request, todo_id):
        try:
            todo = Todo.objects.get(pk=todo_id)
            todo.delete()
            return Response(None, status=204)
        except Todo.DoesNotExist:
            return Response(None, status=400)