const login = `
<section id="wrapper">
  <section class="common-sec login-page-sec">
  	<div class="container">
  		<div class="logo-dv text-center">
  			<a class="navbar-brand" href="./">
  				<span class="site-logo"><img src="asset/img/logo.svg" alt="Logo"></span>
  			</a>
  		</div>
  
  		<div class="login-form-dv">
  			<section class="custom-form-sec">
  				<form class="icon-form" name="admin-login-form">
  					<div class="row">
  						<div class="col-sm-12">
  							<div class="input-bx">
  								<input type="email" spellcheck="false" id="username" class="form-control" autocomplete="off" required placeholder="Username"/>
  							</div>
  						</div><!-- col -->
  					</div><!-- row -->
  
  					<div class="row">
  						<div class="col-sm-12">
  							<div class="input-bx pass-bx">
  								<input type="text" spellcheck="false" id="password" class="form-control" autocomplete="off" required placeholder="Password"/>
  							</div>
  						</div><!-- col -->
  					</div><!-- row -->
  					<div id="forgetPassWord" style="text-align: right; margin-top: 15px; font-size: 14px; font-weight: 600; color: #004a7f; cursor: pointer;">
  					  Forgot Password
            </div>
  					
  					<div style="color: red; text-align: center; font-size: 14px; margin-top: 10px; display: none;" id="login-error">
  					  Wrong username and/or password. Please try again.
  					</div>
  					<div class="submit mt-4">
  						<button type="submit" id="loginBtn" class="custom-btn round-btn">Login</button>
  					</div>
  				</form>
  			</section><!-- custom-form-sec -->
  		</div><!-- login-form-dv -->
  	</div><!-- container -->
  </section><!-- common-sec -->
</section><!-- wrapper -->

	<!-- Modal Thank you Success message -->
	<div class="modal fade custom-modal success-modal" id="sentEmailModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body text-center">
					<div class="img mb-4">
						<img src="./asset/img/verified.png" alt="Success">
					</div>
					<h3 class="modal-title text-center">Thank You!</h3>
					<p>Password sent.</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
	  <div style="display: none" id="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>

`;

export { login };
