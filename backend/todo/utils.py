from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

def getTodosList(request):
    todos=Todo.objects.all()
    
    serializer=TodoSerializer(todos,many=True)
    return Response(serializer.data)

def getTodoDetail(request,pk):
    todos=Todo.objects.get(id=pk)
    serializer=TodoSerializer(todos,many=False)
    return Response(serializer.data)


def updateTodo(request, pk):
    data = request.data
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=todo, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def createTodo(request):
    data=request.data
    todo=Todo.objects.create(
        title=data['title'],
        description=data['description']    
    )
    serializer=TodoSerializer(instance=todo,data=data)
    
    if serializer.is_valid():
        serializer.save()
    
    return serializer.data

def deleteTodo(request,pk):
    todo= Todo.objects.get(id=pk)
    todo.delete()
    return Response("Task was deleted")