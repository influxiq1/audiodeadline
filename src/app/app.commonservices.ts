/**
 * Created by kta pc on 6/16/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices{
    items:Array<any>;
    url:any;
    uploadurl:any;
    uploadncropurl:any;
    uploadncropurlnew:any;
    fileurl:any;
    nodeurl:any;
    siteurl:any;
    FB_APP_ID:any;
    FB_APP_SECRET:any;
    LI_CLIENT_ID:any;
    LI_CLIENT_SECRET:any;
    constructor(private http: Http) {
            this.siteurl = 'https://audiodeadline.com/';
            //this.nodeurl = 'http://192.169.196.208:3009/';
            this.nodeurl = 'http://192.169.196.208:3007/';
            //this.url = 'https://audiodeadline.com/serverlocal.php?q=';
            this.url = 'https://audiodeadline.com/server.php?q=';
            this.uploadurl = 'https://audiodeadline.com/fileupload.php';
            this.uploadncropurl = 'https://audiodeadline.com/fileuploadandcrop.php';
            this.uploadncropurlnew = 'https://audiodeadline.com/fileuploadandcropnew.php';
            this.fileurl = 'https://audiodeadline.com/nodeserver/uploads/';
            this.FB_APP_ID = '906815096194208';
            this.FB_APP_SECRET = 'f569451eb41a239d2045ebf115a3bcc7';
            this.LI_CLIENT_ID = '81dhgq228xfquu';
            this.LI_CLIENT_SECRET = 'EjwBLpUq5683vifK';
        this.items = [
            { serverUrl: this.url },
            { name: 'Ipsita' }
        ];
    }

    getSponsorList(){
        var sponsorList = [
            {'name': 'nike', 'label': 'NIKE'},
            {'name': 'gibson-guitar', 'label': 'GIBSON GUITAR'},
            {'name': 'apogeeinvent', 'label': 'APOGEEINVENT'},
            {'name': 'beto-paredea', 'label': 'BETO PAREDES'},
            {'name': 'flii-stylz', 'label': 'FLII STYLZ'},
            {'name': 'geo-ai', 'label': 'GEO AI'},
        ];

        return sponsorList;
    }

    getBannerTypeList(){
        var bannerTypeList = [
            {'val': 2, 'label': 'SPONSORED MEDIA FOR TICKET SALE PAGE'},
            {'val': 3, 'label': 'BANNER FOR AUDIODEADLINE'},
            {'val': 4, 'label': 'BANNER FOR ARTISTXP'},
            {'val': 5, 'label': 'INSTAGRAM BANNER FOR AUDIODEADLINE'},
            {'val': 6, 'label': 'INSTAGRAM BANNER FOR ARTISTXP'},
        ];

        return bannerTypeList;
    }


    /*---------------------------------------------------START_URL-----------------------------------------------*/
    getItems() {
        return this.items;
    }

    /*---------------------------------------------------END_URL-----------------------------------------------*/
    /*isEmailRegisterd(email: string) {
        console.log(email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var data= {email};
        var link='http://localhost:3007/allemail';
        //return this.http.post('http://localhost:3007/allemail', JSON.stringify({ email: email }), { headers: headers })
         return this.http.post(link , data)
            .map(res => {
                var result = res.json();
                console.log("length "+result.res);
                //console.log(v);
                //return result.res;
            }, error => {
            console.log("Oooops!");
        });


    }*/
    /*---------------------------------------------------START_Addadmin-----------------------------------------------*/
    postUser(dataForm:any) {

        var link = this.url+'adduser';

        var data = {
            firstname: dataForm.value.firstname,
            lastname:  dataForm.value.lastname,
            telephone:  dataForm.value.phone,
            email:  dataForm.value.email,
            password:  dataForm.value.password,
            address:  dataForm.value.address,
            address2:  dataForm.value.address2,
            city:  dataForm.value.city,
            state:  dataForm.value.state,
            zip:  dataForm.value.zipcode,
            rsvp:  dataForm.value.rsvp,
            signupaffiliate:  dataForm.value.signupaffiliate,
        };
        //console.log("addadminservice");
        //console.log(data);
        //return this.http.post(link, data).map((res:Response) => res.json());
    }
    /*---------------------------------------------------END_Addadmin-----------------------------------------------*/

}