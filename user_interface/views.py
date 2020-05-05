from django.shortcuts import render
from api.models import Todo

# Create your views here.
def main_page_view(request):
    # get current list of todos and render them
    todo_list = Todo.objects.all()
    print('list:', todo_list)

    return render(request, 'user_interface/main_page.html', {'todo_list': todo_list})
