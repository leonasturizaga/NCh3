# Generated by Django 5.1.3 on 2024-11-29 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='income',
            field=models.PositiveIntegerField(blank=True, default=None, null=True),
        ),
    ]
