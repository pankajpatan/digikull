# Generated by Django 3.2.4 on 2021-06-16 04:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('data', '0002_auto_20210615_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='batch',
            name='class_cordinator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
