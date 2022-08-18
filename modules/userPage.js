const userPage = `
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
						<span style="cursor: pointer;" id="sortingBtn" class="ic-dv arrow-ic">
							<img src="./asset/img/up-dwn-arr.png" alt="Icon">
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
							<button class="custom-btn" data-toggle="modal" data-target="#addNewUserModal">Add New User</button>
							<button class="custom-btn" data-toggle="modal" data-target="#backupModal">Backup</button>
							<button class="custom-btn" id="documents">Documents</button>
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
	<div class="modal fade custom-modal" id="addNewUserModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<h3 class="modal-title text-center">Add New User</h3>

					<section class="custom-form-sec">
						<form class="icon-form" name="userAddForm" action="" method="post">
							<div class="mdl-input-bx">
								<label>Email</label>
								<input type="email" name="" spellcheck="false" id="addUserEmail" class="form-control" autocomplete="off" required placeholder="Enter Email"/>
							</div>

							<div class="mdl-input-bx">
								<label>Password</label>
								<input type="text" spellcheck="false" name="" id="addUserPass" class="form-control" autocomplete="off" required placeholder="Enter Password"/>
							</div>

							<div class="mdl-input-bx">
								<label>History</label>
								<select name="" required class="form-control" id="addUserHistory">
								  <option value=""></option>
									<option value="0">0 Days</option>
									<option value="7">7 Days</option>
									<option value="30">30 Days</option>
									<option value="90">90 Days</option>
									<option value="180">180 Days</option>
									<option value="365">365 Days</option>
								</select>
							</div>

							<div class="mdl-input-bx">
								<label>IP Address (Optional)</label>
								<textarea type="text" name="" id="addUserIp" class="form-control" autocomplete="off" placeholder="Enter IP Address"></textarea>
							</div>
							<button type="submit" id="addUserBtn" class="custom-btn popSubmit">Add</button>
							<div style="color: red; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="adduser-error">
							  Please try again.
							</div>
							<div style="color: green; text-align: center; font-size: 14px; margin-top: 15px; display: none;" id="adduser-success">
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
`;

export { userPage };
