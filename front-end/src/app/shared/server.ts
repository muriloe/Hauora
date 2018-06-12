import { Component, Input, OnInit } from '@angular/core';

export class ServerInfo {

    getServerName() {
        return 'http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000';
    }
}
