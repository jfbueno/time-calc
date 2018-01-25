import json
from datetime import datetime, timedelta

def handler(event, context):
    req_body = event
    
    qtd_minutos = int(req_body['qtdMinutos'])
    qtd_consultas = int(req_body['qtdConsultas'])
    
    arr = req_body['horaInicio'].split(':')
    hora = int(arr[0])
    minutos = int(arr[1])
    
    base_date = datetime(2000, 1, 1, hora, minutos, 0)
    final_date = base_date + timedelta(minutes = qtd_minutos * qtd_consultas)
    
    just_time = '{:%H:%M}'.format(final_date)
    
    return {
        'success': True,
        'horaFinal': just_time
    }
