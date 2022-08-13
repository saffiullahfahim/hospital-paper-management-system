const documentPage = `
	<section id="wrapper">
		<header class="site-header">
			<div class="container-fluid">
				<nav class="navbar site-navigation">
					<div class="navbar-brand">
						<a href="#">
							<img src="./asset/img/logo.svg" alt="Logo">
						</a>
					</div>

					<div class="search-dv">
						<form name="search-form" id="search_form">
							<button type="submit">
								<img src="./asset/img/search-icon.png" alt="Search">
							</button>
							<input type="text" autocomplete="off" spellcheck="false" name="search" id="search" placeholder="Search">
						</form>
						<span class="ic-dv arrow-ic">
							<a href="#">
								<img src="asset/img/up-dwn-arr.png" alt="Icon">
							</a>
						</span>
					</div>
					
					<ul class="navbar-nav">
						<li style="cursor: pointer" id="logout">
						  <span class="icon"><img src="asset/img/logout.png" alt="LogOut"></span>
						</li>
					</ul>
				</nav>
			</div><!-- container -->
		</header>


		<main class="site-main">
			<section class="user-backup-sec">
				<div class="container-fluid">

					<div class="user-backup-table-wrapp">
						<div class="user-popup-btns">
							<button class="custom-btn" data-toggle="modal" data-target="#addNewDocumentModal">Add New Document</button>
							<button class="custom-btn" data-toggle="modal" data-target="#backupModal">Backup</button>
							<button class="custom-btn" id="users">Users</button>
							<button class="custom-btn" data-toggle="modal" data-target="#changePasswordModal">Change Password</button>
						</div><!-- user-popup-btns -->

						<table style="display: none" class="custom-table"></table>
					</div>
				</div><!-- container -->
			</section><!-- common-sec -->
		</main>
	</section><!-- wrapper -->
	
	<div style="display: ;" id="loading">
	  <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>

	<!-- Modal Add new user -->
	<div class="modal fade custom-modal" id="addNewDocumentModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<h3 class="modal-title text-center">Add New Document</h3>

					<section class="custom-form-sec">
						<form class="icon-form" name="documentAddForm" action="" method="post">
							<div class="mdl-input-bx">
								<label>Document Name</label>
								<input type="text" name="" spellcheck="false" id="addDocumentName" class="form-control" autocomplete="off" required placeholder="Enter Document Name"/>
							</div>

							<div class="mdl-input-bx">
								<label>Document File</label>
								<input type="file" spellcheck="false" name="" id="addDocumentFile" onchange="let docName = document.querySelector('#addDocumentName'); if(docName.value == ''){docName.value = this.files[0].name.slice(0, -4)}" class="form-control" autocomplete="off" required/>
							</div>

							<button type="submit" id="addDocumentBtn" class="custom-btn popSubmit">Add</button>
							<div style="color: red; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="addDocument-error">
							  Please try again.
							</div>
							<div style="color: green; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="addDocument-success">
							  Success!
							</div>
						</form>
					</section><!-- custom-form-sec -->

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->

	<!-- Modal backup -->
	<div class="modal fade custom-modal" id="backupModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<h3 class="modal-title text-center">Backup</h3>

					<section class="custom-form-sec">
						<form class="icon-form" action="" name="backupForm" method="post">
							<div class="mdl-input-bx">
								<label>Enter Backup Email</label>
								<input type="email" spellcheck="false" name="" id="backupEmail" class="form-control" autocomplete="off" placeholder="Enter Backup Email"/>
							</div>
							
							<button type="submit" id="backupBtn" class="custom-btn popSubmit">Backup</button>
							
							<div style="color: red; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="backup-error">
							  Please try again.
							</div>
							<div style="color: green; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="backup-success">
							  Success!
							</div>
						</form>
					</section><!-- custom-form-sec -->

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
	<!-- Modal Change Password -->
	<div class="modal fade custom-modal" id="changePasswordModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<h3 class="modal-title text-center">Change Password</h3>

					<section class="custom-form-sec">
						<form class="icon-form" action="" name="changePasswordForm" method="post">
						  
						  <div class="mdl-input-bx">
								<label>Enter Old Password</label>
								<input minlength="5" type="text" spellcheck="false" name="" required id="oldPass" class="form-control" autocomplete="off" placeholder="Enter Old Password"/>
							</div>
						  
							<div class="mdl-input-bx">
								<label>Enter New Password</label>
								<input minlength="5" type="text" spellcheck="false" name="" required id="newPass" class="form-control" autocomplete="off" placeholder="Enter New Password"/>
							</div>
							
							<div class="mdl-input-bx">
								<label>Confirm New Password</label>
								<input minlength="5" type="text" spellcheck="false" name="" required id="conNewPass" class="form-control" autocomplete="off" placeholder="Confirm New Password"/>
							</div>
							
							<button type="submit" id="changePasswordBtn" class="custom-btn popSubmit">Change</button>
							
							<div style="color: red; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="changePassword-error">
							  Please try again.
							</div>
							<div style="color: green; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="changePassword-success">
							  Success!
							</div>
						</form>
					</section><!-- custom-form-sec -->

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
	<!-- Modal Thank you Success message -->

	<div class="modal fade custom-modal" id="successModal" tabindex="-1" role="dialog" aria-hidden="true">
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
					<p id="modal-success">Document Sent</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
  <!-- Modal Error message -->
	<div class="modal fade custom-modal" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
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
					<p id="modal-error">Please try again.</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
`;

export { documentPage };
