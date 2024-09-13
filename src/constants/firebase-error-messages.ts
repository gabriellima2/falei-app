/* eslint-disable quotes */
export const FIREBASE_ERROR_MESSAGES = {
	'argument-error':
		'Desculpe, parece que houve um erro com os argumentos fornecidos. Por favor, verifique e tente novamente.',
	'app-not-authorized':
		'O aplicativo atual não tem permissão para usar a Autenticação Firebase com a chave API fornecida. Por favor, verifique as configurações de autorização do seu aplicativo.',
	'app-not-installed':
		'A aplicação móvel solicitada não parece estar instalada neste dispositivo. Por favor, verifique se o aplicativo está instalado corretamente.',
	'captcha-check-failed':
		'Desculpe, a verificação do CAPTCHA falhou. Por favor, tente novamente.',
	'code-expired':
		'Desculpe, o código fornecido expirou. Por favor, solicite um novo código.',
	'cordova-not-ready':
		'O framework Cordova ainda não está pronto. Por favor, aguarde um momento e tente novamente.',
	'cors-unsupported':
		'Infelizmente, este navegador não suporta CORS. Por favor, tente usar um navegador diferente.',
	'credential-already-in-use':
		'A credencial fornecida já está vinculada a uma conta de usuário.',
	'custom-token-mismatch':
		'Desculpe, o token personalizado fornecido não corresponde ao público esperado. Por favor, verifique o token e tente novamente.',
	'requires-recent-login':
		'Esta operação é sensível e requer que você tenha feito login recentemente. Por favor, faça login novamente e tente a solicitação mais uma vez.',
	'dynamic-link-not-activated':
		'Por favor, ative os links dinâmicos no Console Firebase e aceite os termos e condições para continuar.',
	'email-already-in-use':
		'O endereço de e-mail fornecido já está sendo usado por outra conta.',
	'expired-action-code':
		'Desculpe, o código de ação fornecido expirou. Por favor, solicite um novo código e tente novamente.',
	'cancelled-popup-request':
		'Esta operação foi cancelada porque outro popup foi aberto. Por favor, feche o popup conflitante e tente novamente.',
	'internal-error':
		'Desculpe, ocorreu um erro interno Por favor, tente novamente mais tarde.',
	'invalid-app-credential':
		'Desculpe, a credencial do aplicativo fornecida é inválida. Por favor, verifique e tente novamente.',
	'invalid-app-id':
		'O identificador do aplicativo móvel fornecido não está registrado para o projeto atual. Por favor, verifique o identificador e tente novamente.',
	'invalid-user-token':
		'A credencial do usuário fornecida não é mais válida. Por favor, faça login novamente e tente a solicitação mais uma vez.',
	'invalid-auth-event':
		'Desculpe, ocorreu um erro interno durante o evento de autenticação. Por favor, tente novamente.',
	'invalid-verification-code':
		'Desculpe, o código de verificação fornecido é inválido. Por favor, verifique o código e tente novamente.',
	'invalid-cordova-configuration':
		'Para habilitar o login OAuth, os seguintes plugins Cordova devem ser instalados: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser e cordova-plugin-customurlscheme. Por favor, instale esses plugins e tente novamente.',
	'invalid-custom-token':
		'Desculpe, o formato do token personalizado fornecido está incorreto. Por favor, verifique a documentação para garantir que o formato esteja correto.',
	'invalid-email':
		'O endereço de e-mail fornecido parece estar mal formatado. Por favor, verifique e tente novamente.',
	'invalid-api-key':
		'Desculpe, a chave API fornecida é inválida. Por favor, verifique se você copiou corretamente a chave.',
	'invalid-credential':
		'A credencial automática fornecida parece estar mal formatada ou expirou. Por favor, verifique e tente novamente.',
	'invalid-message-payload':
		'O modelo de e-mail para esta ação contém caracteres inválidos.',
	'invalid-oauth-provider':
		'Desculpe, o provedor EmailAuthProvider não é suportado para esta operação. Esta operação suporta apenas provedores OAuth.',
	'unauthorized-domain':
		'Este domínio não está autorizado para operações OAuth para o seu projeto Firebase.',
	'invalid-action-code':
		'Desculpe, o código de ação fornecido é inválido. Isso pode acontecer se o código estiver mal formatado, expirado ou já tiver sido usado.',
	'wrong-password':
		'Desculpe, a senha fornecida é inválida ou o usuário não tem uma senha. Por favor, verifique e tente novamente.',
	'invalid-identifier-number':
		'Desculpe, o número do identificador fornecido é inválido. Por favor, verifique e tente novamente.',
	'invalid-recipient-email':
		'Desculpe, o e-mail não foi enviado porque o endereço de e-mail do destinatário fornecido é inválido. Por favor, verifique e tente novamente.',
	'invalid-sender':
		'O modelo de e-mail para esta ação contém um e-mail ou nome de remetente inválido.',
	'invalid-verification-id':
		'Desculpe, o ID de verificação fornecido é inválido. Por favor, verifique e tente novamente.',
	'missing-iframe-start':
		'Desculpe, ocorreu um erro interno. Por favor, tente novamente mais tarde.',
	'auth-domain-config-required':
		"Por favor, certifique-se de incluir 'authDomain' ao chamar 'Firebase.initializeApp()', conforme as instruções no console do Firebase.",
	'missing-app-credential':
		'Desculpe, parece que a credencial do aplicativo está faltando. Por favor, verifique e tente novamente.',
	'missing-verification-code':
		'Desculpe, o código de verificação parece estar faltando. Por favor, verifique e tente novamente.',
	'missing-identifier-number':
		'Desculpe, o número do identificador parece estar faltando. Por favor, verifique e tente novamente.',
	'missing-verification-id':
		'Desculpe, o ID de verificação parece estar faltando. Por favor, verifique e tente novamente.',
	'app-deleted':
		'Desculpe, esta instância do FirebaseApp foi excluída. Por favor, verifique suas configurações do FirebaseApp.',
	'account-exists-with-different-credential':
		'Já existe uma conta com o mesmo endereço de e-mail, mas com credenciais diferentes. Por favor, tente fazer login com as credenciais corretas.',
	'network-request-failed':
		'Desculpe, ocorreu um erro de rede. Por favor, verifique sua conexão de rede e tente novamente.',
	'no-auth-event':
		'Desculpe, ocorreu um erro interno. Por favor, tente novamente mais tarde.',
	'no-such-provider':
		'Desculpe, o usuário não foi vinculado a uma conta com o provedor fornecido. Por favor, verifique o provedor e tente novamente.',
	'operation-not-allowed':
		'Desculpe, o provedor fornecido está desabilitado para este projeto Firebase. Por favor, habilite-o no console do Firebase.',
	'operation-not-supported-in-this-environment':
		"Desculpe, esta operação não é suportada no ambiente em que esta aplicação está rodando. 'location.protocol' deve ser http, https ou chrome-extension e o armazenamento web deve estar habilitado.",
	'popup-blocked':
		'Desculpe, não foi possível estabelecer uma conexão com o popup. Parece que foi bloqueado. Por favor, permita popups para este site e tente novamente.',
	'popup-closed-by-user':
		'Desculpe, o popup foi fechado pelo usuário antes de finalizar a operação. Por favor, mantenha o popup aberto e tente novamente.',
	'provider-already-linked':
		'Desculpe, o usuário só pode ser vinculado a uma identidade para o provedor fornecido.',
	'quota-exceeded':
		'Desculpe, a cota para esta operação foi excedida. Por favor, tente novamente mais tarde.',
	'redirect-cancelled-by-user':
		'Desculpe, a operação de redirecionamento foi cancelada pelo usuário antes de ser concluída. Por favor, tente novamente.',
	'redirect-operation-pending':
		'Desculpe, já existe uma operação de redirecionamento de login pendente. Por favor, aguarde a conclusão da operação atual antes de tentar novamente.',
	timeout:
		'Desculpe, a operação excedeu o tempo limite. Por favor, verifique sua conexão de rede e tente novamente.',
	'user-token-expired':
		'Desculpe, a credencial do usuário não é mais válida. Por favor, faça login novamente para continuar.',
	'too-many-requests':
		'Desculpe, todas as solicitações deste dispositivo foram bloqueadas devido à atividade incomum. Por favor, tente novamente mais tarde.',
	'user-cancelled':
		'Desculpe, o usuário não concedeu à sua solicitação as permissões solicitadas. Por favor, verifique as permissões e tente novamente.',
	'user-not-found':
		'Desculpe, não conseguimos encontrar um usuário correspondente às credenciais fornecidas. Por favor, verifique as credenciais e tente novamente.',
	'user-disabled':
		'Desculpe, a conta do usuário foi desabilitada por um administrador. Para mais informações, entre em contato com o suporte.',
	'user-mismatch':
		'Desculpe, as credenciais que você inseriu não são reconhecidas. Por favor, verifique as credenciais e tente novamente.',
	'user-signed-out':
		'Desculpe, o usuário foi desconectado. Por favor, faça login novamente para continuar.',
	'weak-password':
		'Desculpe, a senha fornecida é fraca. A senha deve ter 8 caracteres ou mais. Por favor, tente novamente com uma senha mais forte.',
	'web-storage-unsupported':
		'Desculpe, este navegador não é suportado ou os cookies e dados de terceiros podem estar desabilitados. Por favor, verifique as configurações do navegador e tente novamente.',
}
