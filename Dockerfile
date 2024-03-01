
FROM python:3.11

WORKDIR /app

COPY ./server/requirements.txt ./

RUN pip install -r requirements.txt

COPY ./server .

EXPOSE 8000

CMD ["uvicorn" ,"server:app", "--host", "0.0.0.0"]
