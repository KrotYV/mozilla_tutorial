import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mozilla_tutorial.settings')

app = Celery('mozilla_tutorial')

app.config_from_object('mozilla_tutorial.settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'task_celery_beat': {
        'task': 'celery_beat.tasks.parser_for_page',
        'schedule': crontab(minute=0, hour='1-23/2')
    }
}
