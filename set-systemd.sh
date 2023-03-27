#!/bin/bash
# By Wildy Sheverando
# Git: https://github.com/wildy8283/GPT-Bot
# ==================================================

export pyt3=$(which python3)
export NJSPATH=$(which node)
export MAIN_PATH=$(pwd)

echo "[Unit]
Description=GPT-API
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${MAIN_PATH}
ExecStart=${pyt3} ${MAIN_PATH}/Server/server.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/gpt-api.service

# >> Restarting service
systemctl daemon-reload
systemctl stop gpt-api
systemctl enable gpt-api
systemctl restart gpt-api

echo "[Unit]
Description=GPT-Bot | WhatsApp
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${MAIN_PATH}
ExecStart=${NJSPATH} ${MAIN_PATH}/WhatsApp/index.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/gpt-bot-wa.service

# >> Restarting service
systemctl daemon-reload
systemctl stop gpt-bot-wa
systemctl enable gpt-bot-wa
systemctl restart gpt-bot-wa
