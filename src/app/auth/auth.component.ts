import { Component, OnInit } from '@angular/core';
import LDClient from 'ldclient-js';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit {
    ldclient;
    turnAuthOn = false;
    constructor () {}
    ngOnInit () {
        console.log('terst');
        this.componentDidMount();
    }

    componentDidMount () {
        const user = {
            firstName: 'Bob',
            lastName: 'Loblaw',
            key: 'UNIQUE IDENTIFIER',
            country: 'Bulgaria',
            custom: {
                groups: 'beta_testers'
            }
        };
        this.ldclient = LDClient.initialize('5d19ed30eae18b07640dc624', user);
        this.ldclient.on('ready', this.onLaunchDarklyReady.bind(this));
        this.ldclient.on('change', this.onLaunchDarklyReady.bind(this));
    }
    onLaunchDarklyReady () {
        this.turnAuthOn = this.ldclient.variation('enable-auth');
        console.log(this.ldclient.getUser());
        console.log(this.ldclient.variationDetail('enable-auth'));
    }
}
