# Generated by Django 3.1.6 on 2021-06-19 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0006_auto_20210619_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendence',
            name='duration',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
