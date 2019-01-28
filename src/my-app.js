
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';

setPassiveTouchGestures(true);

setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #40ed5f;
          --app-secondary-color: black;
          --app-drawer-width: 250px;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          width:100px; margin-top: 10px; display: block; margin-left: 40px;
        }

        .drawer-list a {
          display: block;          
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout>
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">

        <div style="height: 100%; overflow: auto;">
        
          <div style="width:100px; display: block; margin-top:20px; margin-left:40px; ">
                <img src="/images/my_image.jpg" style="border-radius: 50%; background: white;margin-bottom:10px;" />
                <b style="margin-bottom:20px;">LAKSHMIKANTH DHANARAJ </b>
            </div>
        
            <div style=" width:100px; margin-top: 10px; display: block; margin-left:40px; ">
              <img src="/images/fb.png" style="cursor: pointer; width:20px; height:20px; margin-right:10px;"/>
              <img src="/images/insta.png" style="cursor: pointer; width:20px; margin-right: 10px; height:20px;"/>
              <img src="/images/twitter.png" style="cursor: pointer; width:20px; height:20px;"/>
            </div>

            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <a name="about" href="[[rootPath]]about">About</a>
              
          </iron-selector>
        
        </div>


        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div style="margin-right: 20px;">[[pageTitle]]</div>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-view1 name="view1"></my-view1>

          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      pageTitle: String,
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     
    if (!page) {
      this.page = 'view1';
      this.pageTitle = "ABOUT"
    } else if (['about', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
      this.pageTitle = "ABOUT"
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'view1':
        import('./my-view1.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
