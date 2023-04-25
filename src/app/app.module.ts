import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler } from "@angular/core";
import ClientMonitor from "@sixthsense/sixthsense-javascript-agent";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

export class AppGlobalErrorhandler implements ErrorHandler {
  handleError(error: any) {
    ClientMonitor.reportFrameErrors(
      {
	collector: "https://stg-http-collector-observability.sixthsense.rakuten.com/oap",
        service: "eComm-Angular",
        pagePath: location.href,
        serviceVersion: "1.0.0",
          authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiIxOGZhMDJmMS1iNjc1LTQ1MmQtYjllYy0yN2ZhYzdlZWM5MzUiLCJiaWxsaW5nX2lkIjoiYjVjNjVkMDgtMTVhYi00NDkwLTliZDMtM2FiZDc3ODZkN2YxIiwiaWF0IjoxNjIwMzY2NDgyLCJhdWQiOiJvYXAiLCJpc3MiOiJzaXh0aC1zZW5zLWF1dGgifQ.5U4Tlh8Abf25Wa-SJaf4KQHnNz8C-S35hG7ZG5PIHo8"
      },
      error
    );
  }
}

@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: AppGlobalErrorhandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
