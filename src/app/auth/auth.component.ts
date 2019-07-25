import { Component, OnInit } from '@angular/core';
import LDClient from 'launchdarkly-js-client-sdk';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    ldclient;
    turnAuthOn = false;
    constructor() { }
    ngOnInit() {
        console.log('terst');
        this.componentDidMount();
    }

    componentDidMount() {
        const user = {
            firstName: 'Georgi',
            lastName: 'Petrov',
            key: 'UNIQUE IDENTIFIER1',
            country: 'Bulgaria',
            custom: {
                groups: 'beta_testers'
            }
        };
        this.ldclient = LDClient.initialize('5d19ed30eae18b07640dc624', user);
        this.ldclient.on('ready', this.onLaunchDarklyReady);
        this.ldclient.on('change', this.onLaunchDarklyReady);
    }
    onLaunchDarklyReady = () => {
        this.turnAuthOn = this.ldclient.variation('enable-auth');
        console.log(this.ldclient.getUser());
        console.log(this.ldclient.variationDetail('enable-auth'));
    };
}
