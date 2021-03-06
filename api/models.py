from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=500)
    completed = models.BooleanField(null=True, default=None)
    order = models.IntegerField(null=True, default=None)

    def __str__(self):
        return f'{self.title} - Completed: {self.completed}'
