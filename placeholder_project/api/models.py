from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    email = models.EmailField()
    # Address e Company simplificados como JSON para simular a estrutura aninhada
    address = models.JSONField(default=dict, null=True, blank=True) 
    phone = models.CharField(max_length=50)
    website = models.CharField(max_length=200)
    company = models.JSONField(default=dict, null=True, blank=True)

    def __str__(self):
        return self.username

class Todo(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)

class Post(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200)
    body = models.TextField()

class Comment(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    body = models.TextField()

class Album(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='albums')
    title = models.CharField(max_length=200)

class Photo(models.Model):
    albumId = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='photos')
    title = models.CharField(max_length=200)
    url = models.URLField()
    thumbnailUrl = models.URLField()