/*global angular, document, console*/
'use strict';

/* CONTROLLERS */

var webresponseControllers = angular.module('webresponseControllers', []);

webresponseControllers.controller('MessageCtrl', function($scope, $routeParams, messages) {
	var messageId = $routeParams.messageId;

	$scope.$watch(messages.isReady, function() {
		if (messages.isReady() && typeof messageId !== 'undefined') {
			messages.getMessage(messageId).then(messages.setCurMessage, function(error) {
				console.log(error);
			});
		}
	});

	$scope.showOptionsModal = function() {
		// Show the options modal;
		$scope.showOptions = true;
	};

	$scope.hideOptionsModal = function() {
		// Hide the options modal;
		$scope.showOptions = false;
	};
});

webresponseControllers.controller('MessageNavBarCtrl', function($scope, $location, auth) {
    $scope.logOut = function() {
        auth.logOut();
        $location.path('/login', true);
    };
});

webresponseControllers.controller('MessageListCtrl', function($scope, $location, messages) {
    $scope.messages = [];
    $scope.query = "";
    $scope.show = 'All';
    $scope.folder = 'inbox';

    $scope.$watch(messages.isReady, function(n, o) {
        if (messages.isReady()) {
            $scope.loadMessages(0);
        }
    });

    $scope.loadMessages = function(pg) {
        messages.loadMessages(pg).then(function(data) {
            $scope.$apply(function() {
                $scope.messages = data;
            });
        }, function(error) {
            console.log(error);
        });
    };

    ///////////////////////////
    // MESSAGE LIST CONTROLS //
    ///////////////////////////

    $scope.setMessagesUnread = function(unread) {
        var selectedMessages = $scope.getSelected();

        if (selectedMessages.length > 0) {
            selectedMessages.map(function(message) {
                message.status.unread = unread;
            });
        } else if (messages.getCurMessage() !== null) {
            messages.getCurMessage().status.unread = unread;
        }
    };

    $scope.moveMessageTo = function(message, dest) {
        message.folder = dest;
    };

    $scope.setMessageFolder = function(folder) {
        $scope.folder = folder;
    };

    $scope.folderFilter = function(message) {
        return (message.folder === $scope.folder);
    };

    $scope.setListFilter = function(filt) {
        $scope.show = filt;
    };

    $scope.statusFilter = function(message) {
        var flag = true;
        switch ($scope.show) {
            case "Unread":
                flag = message.status.unread;
                break;
            case "unreplied":
                flag = !message.status.repliedTo;
                break;
            case "All":
                break;
        }
        return flag;
    };

    $scope.disableDropdown = function() {
        var selectedMessages = $scope.getSelected();
        var curMessage = messages.getCurMessage();
        return (selectedMessages === 0 && curMessage === null);
    };

    ////////////////////////////////
    // MESSAGE LIST-ITEM CONTROLS //
    ////////////////////////////////

    $scope.getSelected = function() {
        return $scope.messages.filter(function(message) {
            return (message.status.selected);
        });
    };

    $scope.curMessage = messages.curMessage;
    $scope.forwardPressed = false;

    $scope.$watch(function() {
        return ($scope.curMessage !== messages.curMessage);
    }, function(newMessage, oldMessage, scope) {
        $scope.curMessage = messages.curMessage;
        $scope.forwardPressed = false;
    });
    $scope.clearSelected = function() {
        $scope.messages = $scope.messages.map(function(message, i) {
            message.status.selected = false;
            return (message);
        });
    };

    $scope.viewMessage = function(message) {
        // 1. set is as new message
        if (messages.getCurMessage() !== message) {
            messages.setCurMessage(message);
        } else {
            messages.setCurMessage(null);
        }

        // 2. change path
        var pathId = (!!messages.getCurMessage()) ? ('/' + message.id) : '';
        var newPath = '/messages' + pathId;
        $location.path(newPath, false);
    };
});


webresponseControllers.controller('MessageViewCtrl', function($scope, $compile, messages, UserService) {
	var emailRX = /(([-\w!#$%&'*+\/=?^_`{|}~]|\"([^\"\n\r\\]|\\[^-\w!#$%&'*+\/=?^_`{|}~])*\"|\\[^-\w!#$%&'*+\/=?^_`{|}~])(\.)?)+\@[-_\w]+(\.[-_\w]+)+/;

	$scope.replyForm = {
		"content" : "",
		"targetStr" : "",
		"targets" : new Set(),
		"targetSuggestions" : [],
		"templates" : []
	};

	$scope.$watch(function() {
		return ($scope.curMessage !== messages.getCurMessage());
	}, function(newMessage, oldMessage) {
		$scope.curMessage = messages.getCurMessage();
	});

	var fmtEmail = function(tgt) {
		return "<span class='email-label' unselectable='on' autocorrect='off' autocapitalize='off'>" + tgt.username + "</span>";
	};

	$scope.chooseSuggestion = function(tgt) {
		var targets = $scope.replyForm.targets;
		targets.add(tgt);
		console.log(targets);
		var tgts = [];
		targets.forEach(function(tgt) {
			tgts.push(fmtEmail(tgt));
		});
		$scope.replyForm.targetStr = ' ' + tgts.join(' ') + ' ';
		$scope.replyForm.targetSuggestions = [];
	};

	$scope.parseTargetInputs = function() {
		var targets = $scope.replyForm.targetStr.split(" ");
		if (typeof targets === 'undefined' || typeof targets === null) return;

		var cand = targets[targets.length - 1];

		// List suggestions
		if (cand.length >= 3) {
			UserService.queryByUsername(cand).then(function(data) {
				$scope.replyForm.targetSuggestions = data;
				console.log(data);
			}, function(error) {
				console.log(Error(error));
			});
		}
		// Else, completed email?
		if (emailRX.test(cand)) {
			UserService.findByEmail(cand).then(function(data) {
				$scope.chooseSuggestion(data);
			}, function(error) {
				console.log(Error(error));
			});
		}
	};

	$scope.reply = function(msg) {
		var replyContent = $scope.replyForm.content
									.replace(/<\S+br\S+>/g,"\r\n")
									.replace(/<([^>]*)>/g, "");

		messages.sendMessage({
			"sentBy": "us",
			"to": $scope.replyForm.targetStr,
			"subject": "RE: " + msg.subject,
			"message": replyContent
		}).then(function(data) {
			$scope.curMessage.thread.push(msg);
			$scope.replyForm.targetStr = "";
			$scope.replyForm.targets.clear();
			$scope.replyForm.content = "";
		}, function(error) {
			console.log(error);
		});
	};

	$scope.forward = function(msgData) {
		var sendTo = msgData.email;
		var content = msgData.content;

		// Format forwarded content
		content = content.split('\n').map(function(line, i) {
			return "".concat(">>> ", line);
		}).join('\n');
		content = "\n\n" + content;

		// Insert into DOM
		$scope.replyForm.targetStr = sendTo;
		$scope.replyForm.content = content;
	};
});

webresponseControllers.controller('LoginCtrl', function($scope, $location, auth) {
    $scope.loggedIn = false;
    $scope.errorMsg = null;
    $scope.username = "";
    $scope.pw = "";

    $scope.logIn = function() {
        console.log("Logging in...");
        auth.authenticate({
            "username": $scope.username,
            "password": $scope.pw,
        }).then(function(success) {
			console.log(success);
            // $location.path('/messages', false);
			$scope.$apply(function() {
				$scope.errorMsg = "";
				$location.path('/messages', true);
			});
        }, function(error) {
			$scope.$apply(function() {
				$scope.errorMsg = error;
			});
        });
    };
});

webresponseControllers.controller('OptionsCtrl', ['$scope', function($scope) {
    $scope.panel = 1;

    $scope.selectPanel = function(setPanel) {
        $scope.panel = setPanel;
    };

    $scope.isSelected = function(checkPanel) {
        return $scope.panel === checkPanel;
    };

    $scope.getPanel = function() {
        return $scope.panel;
    };

    $scope.optionItems = [{
        "header": "General",
        "icon": "img/gen-set-icon.png",
        "panelNum": 1,
        "config": [{
            "title": "Signature",
            "data": "SIGNATURE HERE",
            "setting": "Change Signature",
            "isActive": false
        }, {
            "title": "Blocked Email Addresses",
            "data": "BLOCKED EMAILS HERE",
            "setting": "Change Blocked Emails",
            "isActive": false
        }]
    }, {
        "header": "Account",
        "icon": "img/acc-icon.png",
        "panelNum": 2,
        "config": [{
            "title": "Name",
            "data": "PETER PARKER",
            "setting": "Change Name",
            "isActive": false
        }, {
            "title": "Email",
            "data": "PETER.PARKER@EMPIRESTATE.EDU",
            "setting": "Change Email",
            "isActive": false
        }, {
            "title": "Username",
            "data": "SPIDEYKID101",
            "setting": "Change Username",
            "isActive": false
        }, {
            "title": "Password",
            "data": "●●●●●●●●●",
            "setting": "Change Password",
            "isActive": false
        }]
    }, {
        "header": "Administrative",
        "icon": "img/adm-icon.png",
        "panelNum": 3,
        "config": [{
            "title": "Accounts with Access",
            "data": "ACCOUNTS WITH ACCESS HERE",
            "setting": "Change Accounts with Access",
            "isActive": false
        }, {
            "title": "Accounts without Access",
            "data": "ACCOUNTS WITHOUT ACCESS HERE",
            "setting": "Change Accounts without Access",
            "isActive": false
        }]
    }, {
        "header": "Help",
        "icon": "img/help-icon.png",
        "panelNum": 4,
        "config": [{
            "title": "Tutorial Here",
        }]
    }];

    $scope.setChildActive = function(config) {
        config.isActive = (config.isActive === false && config.setting !== null);
    };

}]);
