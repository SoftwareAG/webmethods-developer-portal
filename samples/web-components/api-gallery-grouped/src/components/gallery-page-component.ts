import {AbstractPortalElement} from "../abstract.portal.element";
import {ApiElement} from "./api.element";
import {RequestDataService} from "../service/request.service";
import {ApiModel} from "../model/data/api.model";
import {List} from "../model/list";

export class GalleryPageComponent  extends AbstractPortalElement {

    apisModels: ApiModel[] = null;
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    async render(): Promise<any> {
        this.shadowRoot.innerHTML = '<div id="gallery"></div>';
        this.shadowRoot.getElementById('gallery').innerHTML = this.getTemplate();

        const apicontent: HTMLDivElement = document.createElement('div');
        apicontent.classList.add('content');
        apicontent.setAttribute('id', 'apicontent');
        this.shadowRoot.getElementById('gallery').appendChild(apicontent);

        this.shadowRoot.querySelectorAll('.dropbtn').forEach(
            e => e.addEventListener('click', (event) => {
                this.shadowRoot.getElementById('myDropdown').classList.toggle('show');
            })
        );

        this.shadowRoot.getElementById('myDropdown').querySelectorAll('.group').forEach(
            e => {
                e.addEventListener('click', (event) => {
                console.log('a clicked');
                console.log(event);
                var groupBy: string = e.id;
                this.shadowRoot.getElementById('dropbtn_text').innerText = e.innerHTML;
                this.shadowRoot.getElementById('apicontent').innerHTML = "";
                const apisGrouping: {[key: string]: ApiModel[]} = this.groupApis(this.apisModels, groupBy);
                this.renderAPIByGrouping(apisGrouping);
                })
            }
        )

        await this.searchAPI('/portal/rest/v1/apis/search?page=0&limit=100');
    }

    async searchAPI(link: string) {
        const service = new RequestDataService();
        const payload = this.getPayload();
        const apis: List<ApiModel> = await service.postAsJSON(link, JSON.stringify(payload));
        this.apisModels = apis.result;
        //const value: ApiModel[] = apis.result;
        const apisGrouping: {[key: string]: ApiModel[]} = this.groupApis(apis.result, 'type');
        this.renderAPIByGrouping(apisGrouping);

    }

    private renderAPIByGrouping(apisGrouping: { [p: string]: ApiModel[] }) {
        let apicontent: HTMLElement = this.shadowRoot.getElementById('apicontent');

        Object.keys(apisGrouping).sort().forEach(value1 => {
            const groupHeading: HTMLElement = document.createElement("h2");
            groupHeading.innerText = value1;
            apicontent.appendChild(groupHeading);

            const divHeading: HTMLElement = document.createElement('div');
            divHeading.classList.add('apis');

            apicontent.appendChild(divHeading);
            var value = apisGrouping[value1];
            value.forEach(api => {
                const htmlElement: HTMLElement = document.createElement('api-gallery-api');
                htmlElement.setAttribute("class", "api");
                divHeading.appendChild(htmlElement);
                (htmlElement as ApiElement).setContext({
                    getData: () => api,
                    getLocaleString: this.getLocaleString,
                    navigate: this.navigate
                });
            });
        })
    }

    groupApis(apis: ApiModel[], howToGroup: string): {[key: string]: ApiModel[]} {
       const APIsByGrouping : any = {};
       apis.forEach(api => {
           let type;
           if(howToGroup !== 'type'){
               type = api[howToGroup] ? api[howToGroup][0]['name'] : 'Undefined';
           }else {
               type = api[howToGroup];
           }
           let apis: ApiModel[] = APIsByGrouping[type];
           if(!apis) {
               APIsByGrouping[type] = [];
           }
           APIsByGrouping[type].push(api);
       })
        console.log('APIsByGrouping:'+JSON.stringify(APIsByGrouping));
       return APIsByGrouping;
    }

    private getPayload() {
        const payload: any = {
            conjunction: 'AND',
            criterias: [{field: 'latest', values: ['true'], operation: 'EQUALS'}],
            sort: {name: 'ASC'}
        };
        return payload;
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
            <h2>API gallery</h2>
            <div class="dropdown">
              <button class="dropbtn">
                <span id="dropbtn_text" >API Group</span>
                <span class="dropdown-arrow"></span>
              </button>
              <div id="myDropdown" class="dropdown-content">
                <span class="group" id="maturityStatus">Maturity Status</span>
                <span class="group" id="type">API Group</span>
                <span class="group" id="businessTerms">Business Terms</span>
              </div>
            </div>
        </div>
        `
    }


}