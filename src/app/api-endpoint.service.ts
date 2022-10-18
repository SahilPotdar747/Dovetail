import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointService {
  constructor(protected http: HttpClient) {}
  private BASE_URL = environment.apiUrl;

  private LOGIN = this.BASE_URL + '/user/login';
  private SIGNUP = this.BASE_URL + '/user/register';
  private AREA = this.BASE_URL + '/area';
  private USER = this.BASE_URL + '/user';
  private TENANT = this.BASE_URL + '/tenant';
  private SECTION = this.BASE_URL + '/section';
  private PRODUCTTYPE = this.BASE_URL + '/productType';
  private FIELDS = this.BASE_URL + '/property';
  private DOCUMENTTYPE = this.BASE_URL + '/documentType';
  private CREATETENANTUSER = 'https://api.specdovetail.com/api/v1/auth/signup';
  private DRAGDROPDATA = this.BASE_URL + '/property/dragDrop/data';

  getHeader(): any {
    const authToken = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + authToken),
    };
  }

  login(rqData: any) {
    return this.http.post(this.LOGIN, rqData).toPromise();
  }

  signUp(rqData: any) {
    return this.http.post(this.SIGNUP, rqData).toPromise();
  }

  // Product Types API's
  getProductType(pageCount: number = 1, value: any = '') {
    let url = this.PRODUCTTYPE + `?limit=30&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createProductType(rqData: any) {
    return this.http
      .post(this.PRODUCTTYPE, rqData, this.getHeader())
      .toPromise();
  }

  updateProductType(rqData: any, id: any) {
    return this.http
      .patch(this.PRODUCTTYPE + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  deleteProductType(reqData: any) {
    return this.http
      .post(this.PRODUCTTYPE + '/delete', reqData, this.getHeader())
      .toPromise();
  }

  // Product Type Fields API's
  getProductTypeFields(pageCount: number = 1, value: any = '') {
    let url = this.FIELDS + `?limit=7&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createProductFields(rqData: any) {
    return this.http.post(this.FIELDS, rqData, this.getHeader()).toPromise();
  }

  updateProductFields(rqData: any, id: any) {
    return this.http
      .patch(this.FIELDS + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  deleteProductFields(rqData: any) {
    return this.http
      .post(this.FIELDS + '/delete', rqData, this.getHeader())
      .toPromise();
  }

  getProductField() {
    return this.http.get(this.DRAGDROPDATA, this.getHeader()).toPromise();
  }

  // Area / Room Types API's
  getArea(pageCount: number = 1, value: any = '') {
    let url = this.AREA + `?limit=13&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createArea(rqData: any) {
    return this.http.post(this.AREA, rqData, this.getHeader()).toPromise();
  }

  updateArea(rqData: any, id: any) {
    return this.http
      .patch(this.AREA + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  deleteArea(rqData: any) {
    return this.http
      .post(this.AREA + '/delete', rqData, this.getHeader())
      .toPromise();
  }

  // Section API's
  getSection(pageCount: number = 1, value: any = '') {
    let url = this.SECTION + `?limit=15&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createSection(rqData: any) {
    return this.http.post(this.SECTION, rqData, this.getHeader()).toPromise();
  }

  updateSection(id: any, qData: any) {
    return this.http
      .patch(this.SECTION + '/' + id, qData, this.getHeader())
      .toPromise();
  }

  deleteSection(rqData: any) {
    return this.http
      .post(this.SECTION + '/delete', rqData, this.getHeader())
      .toPromise();
  }
  productTypeCategories() {
    return this.http
      .get(this.PRODUCTTYPE + '/dragDrop/data', this.getHeader())
      .toPromise();
  }

  getAllSection() {
    return this.http
      .get(this.SECTION + '/dragDrop/data', this.getHeader())
      .toPromise();
  }

  // Document Types API's
  getDocument(pageCount: number = 1, value: any = '') {
    let url = this.DOCUMENTTYPE + `?limit=12&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  deleteDocumentType(rqData: any) {
    return this.http
      .post(this.DOCUMENTTYPE + '/delete', rqData, this.getHeader())
      .toPromise();
  }

  createDocumentType(rqData: any) {
    return this.http
      .post(this.DOCUMENTTYPE, rqData, this.getHeader())
      .toPromise();
  }

  updateDocumentType(rqData: any, id: any) {
    return this.http
      .patch(this.DOCUMENTTYPE + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  // Admin User API's
  getUser(pageCount: number = 1, value: any = '') {
    let url = this.USER + `?limit15&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createAdminUser(rqData: any) {
    return this.http.post(this.USER, rqData, this.getHeader()).toPromise();
  }

  updateAdminUser(rqData: any, id: any) {
    return this.http
      .patch(this.USER + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  deleteAdminUser(id: any) {
    return this.http.delete(this.USER + '/' + id, this.getHeader()).toPromise();
  }

  // Tenant User API's
  getTenant(pageCount: number = 1, value: any = '') {
    let url = this.TENANT + `?limit=15&page=${pageCount}`;
    if (value != '') {
      url += `&name=${value}`;
    }
    return this.http.get(url, this.getHeader()).toPromise();
  }

  createTenantUser(rqData: any) {
    return this.http
      .post(this.CREATETENANTUSER, rqData, this.getHeader())
      .toPromise();
  }

  updateTenantUser(rqData: any, id: any) {
    return this.http
      .patch(this.TENANT + '/' + id, rqData, this.getHeader())
      .toPromise();
  }

  deleteTenantUser(id: any) {
    return this.http
      .delete(this.TENANT + '/' + id, this.getHeader())
      .toPromise();
  }

  getAllTenant() {
    return this.http
      .get(this.TENANT + '/tenantid/data', this.getHeader())
      .toPromise();
  }
}
