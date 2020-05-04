from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=500)
    completed = models.BooleanField(null=True, default=None)
    url = models.CharField(max_length=500, null=True, default=None)
    order = models.IntegerField(null=True, default=None)