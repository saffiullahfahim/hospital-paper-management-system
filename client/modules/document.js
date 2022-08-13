import { doc } from "./viewer.js";

const $document = `
	<section id="wrapper">
		<header class="site-header">
			<div class="container-fluid">
				<nav class="navbar site-navigation">
					<div class="navbar-brand">
						<a href="#">
							<img src="asset/img/client-Valley-Logo.svg" alt="Logo">
						</a>
					</div>
					
					<!--ul class="navbar-nav">
						<li>
							<a href="#">
								<span class="icon"><img src="asset/img/logout.png" alt="LogOut"></span>
							</a>
						</li>
					</ul-->
				</nav>
			</div><!-- container -->
		</header>


		<main class="site-main">
			<section class="common-sec">
				<div class="container-fluid">
					
					<div class="client-document-wrapp">
						<div class="doc-view-bx">
							<div id="viewerDiv" style="width: 100%; height: 600px; background: #eee;">
							  ${doc}
							</div>
							<div class="signature-box">
								<div class="sign-bx">
									<button class="custom-btn" onclick="signShow()" id="signBtn">Sign</button>
								</div>
							</div>
						</div>
					</div>

				</div><!-- container -->
			</section><!-- common-sec -->
		</main>
	</section><!-- wrapper -->

	<!-- Modal Signature -->
	<div class="modal fade custom-modal" id="signatureModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="signatureModContent">
						<!--textarea name="" id=""></textarea-->
						<canvas height="200" style="border: 1px solid #000; border-radius: 5px; margin-bottom: 15px" id="signCanvas"></canvas>
						<div class="button-bx">
							<button class="custom-btn" onclick="signatureSubmit(this)">Submit</button>
							<button class="custom-btn close-btn" data-dismiss="modal" aria-label="Close">Cancel</button>
						</div>
					</div>
				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->

	<!-- Modal Thank you Success message -->
	<div class="modal fade custom-modal verifiedModalClass" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button style="display: none; type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body text-center">
					<div class="img mb-4">
						<img src="./asset/img/verified.png" alt="Success">
					</div>
					<h3 class="modal-title text-center">Thank You!</h3>
					<p>Document Sent</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
  <!-- Modal Error message -->
	<div class="modal fade custom-modal verifiedModalClass" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button id="error-Close" type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body text-center">
					<div class="img mb-4">
						<img style="width: 75px;" src="./asset/img/error.png" alt="Error">
					</div>
					<h3 class="modal-title text-center">Error!</h3>
					<p id="error">Please try again.</p>

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

export { $document };
