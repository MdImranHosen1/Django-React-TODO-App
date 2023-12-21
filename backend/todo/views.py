from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from .models import Todo
from .utils import updateTodo, getTodoDetail, deleteTodo, getTodosList, createTodo
# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class=TodoSerializer
    queryset=Todo.objects.all()


# /getTodo GET
# /getTodo POST
# /getTodo/<id> GET
# /getTodo/<id> PUT
# /getTodo/<id> DELETE

@api_view(['GET', 'POST'])
def getTodos(request):

    if request.method == 'GET':
        return getTodosList(request)

    if request.method == 'POST':
        return createTodo(request)
    

@api_view(['GET', 'PUT', 'DELETE'])
def getTodo(request, pk):

    if request.method == 'GET':
        return getTodoDetail(request, pk)

    if request.method == 'PUT':
        return updateTodo(request, pk)

    if request.method == 'DELETE':
        return deleteTodo(request, pk)