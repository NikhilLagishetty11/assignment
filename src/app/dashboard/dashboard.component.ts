import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app.state';
import { Details } from '../details';
import { deletePost } from '../state/post.actions';
import { getPosts } from '../state/post.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private sortingOrder;

  colTable: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'address', 'date', 'edit', 'delete']
  dsColTable: MatTableDataSource<Details>;

  details: Array<Details>


  searchText;
  searchText1;
  searchTextto;

  posts: Observable<Details[]>;
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
   this.columnDefs=[
     {
       headerName: "Athlete",
       field : "athlete",
       width : 150,
       sortable : true,
       filter : true,
       checkBoxSelection: true
     },
     {
      headerName: "Age",
      field : "age",
      width : 90,
       sortable : true,
       filter : true
     },
     {
      headerName: "Country",
      field : "country",
      width : 90,
       sortable : true,
       filter : true
     },
     {
      headerName: "Year",
      field : "year",
      width : 90,
       sortable : true,
       filter : true
     },
     {
      headerName: "Gold",
      field : "gold",
      width : 90,
      sortable : true,
       filter : true
     },
     {
      headerName: "Silver",
      field : "silver",
      width : 90,
      sortable : true,
       filter : true
     },
     {
      headerName: "Bronze",
      field : "bronze",
      sortable : true,
       filter : true,
      width : 90
     },
     {
      headerName: "Total",
      field : "total",
      width : 90,
      sortable : true,
       filter : true,
     },
   ];

    this.dsColTable = new MatTableDataSource<Details>();

  }
  // onGridReady(params){
  // this.gridApi= params.api;
  // this.gridColumnApi=params.columnApi;
  // this.httpClient.get("https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json")
  // .subscribe(data=>{
  //   params.api.setRowData(data);
  // })
 
  // }

  disp: boolean = false
  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }
  posts1: any
  selectedUsers: any
  showAll() {
    this.disp = !this.disp
    this.selectedUsers = this.posts.subscribe((data) => {
      this.posts1 = data
      console.log(data)
      console.log(this.posts1)
    })
    this.selectedUsers = this.posts1
    console.log(this.selectedUsers)
    this.dsColTable.data = this.selectedUsers
  }

  search() {
    let startDate;
    let endDate;
    let d1 = Date.parse(this.searchText);
    let d2 = Date.parse(this.searchTextto);
    console.log(d1)
    console.log(d2)
    if (d1 > d2) {
      alert("start date should be less than end date");
    }
    else {
      this.disp = true
      console.log(this.searchText)
      console.log(this.searchTextto)
      this.selectedUsers = this.posts.subscribe((data) => {
        this.posts1 = data
      })
      this.selectedUsers = this.posts1.filter(f => Date.parse(f.date) > d1 && Date.parse(f.date) < d2);
      if (this.selectedUsers == null) {
        this.selectedUsers = []
      }
      console.log(this.selectedUsers)
      this.dsColTable.data = this.selectedUsers
    }
  }
  deletePost(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this details',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deletePost({ id }));
        this.showAll()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Details Deleted',
          showConfirmButton: false,  
        })
        console.log('Clicked Yes, File deleted!');
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    })
  }
}
