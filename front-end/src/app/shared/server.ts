import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

export class ServerInfo {
  getServerName() {
    return environment.baseurl;
  }
}
