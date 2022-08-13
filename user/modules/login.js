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
`

export {login};