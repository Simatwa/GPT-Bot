#!/bin/bash

export pyt3=$(which python3)
export MAIN_PATH=$(pwd)

echo "[Unit]
Description=GPT-API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/program/GPT-Bot/WhatsApp
ExecStart=${pyt3} ${MAIN_PATH}/Server/server.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/gpt-api.service

