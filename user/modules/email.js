import { doc } from "./viewer.js";

const emailPage = `
<section id="wrapper">
		<header class="site-header">
			<div class="container-fluid">
				<nav class="navbar site-navigation">
					<div class="navbar-brand">
						<a href="#">
							<img src="asset/img/logo.svg" alt="Logo">
						</a>
					</div>
					
					<ul class="navbar-nav" class="active">
						<li id="home">
							<a href="#">
								<span class="txt">Home</span>
							</a>
						</li>
						<li id="inbox">
							<a href="#">
								<span class="icon">
									<img src="asset/img/mail.png" alt="Inbox" class="iconBlack"/>
									<img src="asset/img/mail-white.png" alt="Inbox" class="iconBlue"/>
								</span>
								<span class="txt">Inbox</span>
							</a>
						</li>
						<li id="history">
							<a href="#">
								<span class="icon">
									<img src="asset/img/share-clock.png" alt="History" class="iconBlack"/>
									<img src="asset/img/share-clock-blue.png" alt="History" class="iconBlue"/>
								</span>
								<span class="txt">History</span>
							</a>
						</li>
						<li id="logout">
							<a href="#">
								<span class="icon"><img src="asset/img/logout.png" alt="LogOut"></span>
							</a>
						</li>
					</ul>
				</nav>
			</div><!-- container -->
		</header>


		<main class="site-main">
			<section class="common-sec">
				<div class="container-fluid">

					<form name="emailSendForm" id="secure-message-form">
						<div class="row align-items-center">
							<div class="col-md-5 col-lg-4">

								<div class="user-send-email-wrapp">
								  <!--div class="mdl-input-bx">
										<label>Name</label>
										<input type="text" oninput="inputPrevent(event)" name="" id="emailSendName" class="form-control" spellcheck="false" autocomplete="off" required placeholder="Copy & paste only"/>
									</div-->
								  
									<div class="mdl-input-bx">
										<label>Email</label>
										<input type="text" name="" oninput="inputPrevent(event)" id="emailSendEmail" class="form-control" spellcheck="false" autocomplete="off" required placeholder="Copy & paste only"/>
									</div>

									<div class="mdl-input-bx">
										<label>Date Of Birth</label>
										<input type="text" name="" oninput="inputPrevent(event)" id="emailSendDate" class="form-control" spellcheck="false" autocomplete="off" required placeholder="Copy & paste only"/>
									</div>
									
									<div style="color: red; text-align: center; font-size: 14px; margin-top: 10px; margin-bottom: 15px; display: none;" id="error">
  					        Something is wrong. Please try again.
  					      </div>
									<button type="submit" class="custom-btn" id="emailSendBtn">Send</button>		
								</div><!-- user-send-email-wrapp -->

							</div><!-- col -->

							<div class="col-md-7 col-lg-8">

								<div class="user-send-doc-wrapp">
									<div class="doc-view-bx">
										<div style="width: 100%; height: 600px; " id="viewerDiv">
									    ${doc}
									  </div>
									</div>
								</div><!-- user-send-doc-wrapp -->

							</div><!-- col -->						
						</div><!-- row -->
					</form>

				</div><!-- container -->
			</section><!-- common-sec -->
		</main>
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
					<p>Document sent.</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
	  <div style="display: " id="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
`;

export { emailPage }

