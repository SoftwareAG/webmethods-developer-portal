import {AbstractPortalElement} from "../abstract.portal.element";
import {AssetBox} from "./asset-box";
import {RequestDataService} from "../service/request.service";
import {ApiModel} from "../model/data/api.model";
import {List} from "../model/list";

export class GalleryPageComponent  extends AbstractPortalElement {

    assetModels: any[] = null;
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    async render(): Promise<any> {
        this.shadowRoot.innerHTML = '<div id="gallery"></div>';
        this.shadowRoot.getElementById('gallery').innerHTML = this.getTemplate();

        const assetDivContent: HTMLDivElement = document.createElement('div');
        assetDivContent.classList.add('content');
        assetDivContent.setAttribute('id', 'apicontent');
        this.shadowRoot.getElementById('gallery').appendChild(assetDivContent);

        this.shadowRoot.querySelectorAll('.dropbtn').forEach(
            e => e.addEventListener('click', (event) => {
                this.shadowRoot.getElementById('myDropdown').classList.toggle('show');
            })
        );

        this.shadowRoot.getElementById('myDropdown').querySelectorAll('.group').forEach(
            e => {
                e.addEventListener('click', (event) => {
                var groupBy: string = e.id;
                this.shadowRoot.getElementById('dropbtn_text').innerText = e.innerHTML;
                this.shadowRoot.getElementById('apicontent').innerHTML = "";
                this.renderAssetBox(this.assetModels);
                })
            }
        )

        await this.getAssets('/portal/rest/v1/types/tickets/instances');
    }

    async getAssets(link: string) {
        const service = new RequestDataService();
        const assets: List<any> = await service.getAsJSON(link);
        this.assetModels = assets.result;
        this.renderAssetBox(assets.result);
    }

    private renderAssetBox(assets: any[]) {
        let apicontent: HTMLElement = this.shadowRoot.getElementById('apicontent');

        const divHeading: HTMLElement = document.createElement('div');
        divHeading.classList.add('apis');

        apicontent.appendChild(divHeading);

        assets.forEach(api => {
            const htmlElement: HTMLElement = document.createElement('asset-box');
            htmlElement.setAttribute("class", "api");
            divHeading.appendChild(htmlElement);
            (htmlElement as AssetBox).setContext({
                getData: () => api,
                getLocaleString: this.getLocaleString,
                navigate: this.navigate
            });
        });
    }


    private getTemplate() {
        return `
        <style>
            .apis {
              font-family: "Roboto", Arial, sans-serif;
              display: flex;
              width: 100%;
              flex-wrap: wrap;
            }
            
            .api {
              width: 20%;
              height: 375px;
              padding: 20px;
              border: 2px solid #ebebeb;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-left: 2.5%;
              margin-bottom: 20px;
            }
            
            .view-button {
              margin-top: auto;
              color: #ffffff;
              background-color: #1776bf;
              border: 2px solid #1776bf;
              background-image: none;
              font-size: 16px;
              box-shadow: none;
              padding: 5px 15px 6px 15px;
              font-weight: normal;
            }
            
            .description {
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            h2 {
                font-size: 22px;
                font-weight: 300;
                color: #333333;
                line-height: 40px;
            }
            
            .api:nth-child(4n+1) {
                margin-left: 0;
            }
            
            .dropbtn {
                  background-color: #ffffff;
                  width: 150px;
                  padding: 5px;
                  font-size: 16px;
                  border: none;
                  cursor: pointer;
                  border: 1px solid #ebebeb;
                  display: flex;
                  justify-content: space-between;
                }
                
                .dropbtn:hover, .dropbtn:focus {
                  
                }
                
                .dropdown {
                  position: relative;
                  display: inline-block;
                }
                
                .dropdown-content {
                  display: none;
                  position: absolute;
                  background-color: #ffffff;
                  overflow: auto;
                  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                  z-index: 1;
                }
                
                .dropdown-content span {
                  color: black;
                  width: 150px;
                  padding: 5px;
                  text-decoration: none;
                  display: block;
                }
                
                .dropdown span:hover {
                    background: #ecf4f9;
                }
                .show {
                    display: block;
                }
                
                .dropdown-arrow {
                    position: relative;
                }
                                
                .dropdown-arrow:after {
                    content: "";
                    position: absolute;
                    right: 2px;
                    top: 8px;
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #fff;
                }
                
                .dropdown-arrow:before {
                    position: absolute;
                    content: "";
                    width: 26px;
                    height: 29px;
                    top: -5px;
                    right: -5px;
                    background-color: #1776bf;
}
                }
        </style>
        <div class="header">
            <h2>Asset gallery</h2>
            <div class="dropdown">
              <button class="dropbtn">
                <span id="dropbtn_text">Select asset</span>
                <span class="dropdown-arrow"></span>
              </button>
              <div id="myDropdown" class="dropdown-content">
                <span class="group" id="maturityStatus">Tickets</span>
                <span class="group" id="type">Hackathon</span>
                <span class="group" id="businessTerms">Beta</span>
              </div>
            </div>
        </div>
        `
    }


}