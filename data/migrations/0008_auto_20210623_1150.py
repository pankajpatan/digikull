# Generated by Django 3.2.4 on 2021-06-23 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0007_auto_20210619_2240'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendence',
            name='meeting_title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='grades',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
