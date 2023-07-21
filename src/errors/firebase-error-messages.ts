export const FIREBASE_ERROR_MESSAGES: { [key: string]: string } = {
	"argument-error": "",
	"app-not-authorized":
		"Este aplicativo, identificado pelo domínio onde está hospedado, não está autorizado a usar Firebase Authentication com a chave API fornecida.",
	"app-not-installed":
		"A aplicação móvel solicitada correspondente ao identificador (nome do pacote Android ou ID do pacote iOS) fornecido não está instalada neste dispositivo.",
	"captcha-check-failed": "",
	"code-expired": "",
	"cordova-not-ready": "O framework Cordova não está pronto.",
	"cors-unsupported": "Este navegador não é suportado.",
	"credential-already-in-use":
		"Esta credencial já está associada a uma conta de usuário diferente.",
	"custom-token-mismatch":
		"O token personalizado corresponde a um público diferente.",
	"requires-recent-login":
		"Esta operação é sensível e requer autenticação recente. Faça o login novamente antes de tentar novamente esta solicitação.",
	"dynamic-link-not-activated":
		"Ative os links dinâmicos no Firebase Console e concorde com os termos e condições.",
	"email-already-in-use":
		"O endereço de e-mail já está em uso por outra conta.",
	"expired-action-code": "O código de ação expirou.",
	"cancelled-popup-request":
		"Esta operação foi cancelada devido a outro popup conflitante sendo aberto.",
	"internal-error": "Ocorreu um erro interno.",
	"invalid-app-credential": "",
	"invalid-app-id":
		"O identificador do aplicativo móvel não está registrado para o projeto atual.",
	"invalid-user-token":
		"A credencial do usuário não é mais válida. O usuário deve entrar novamente",
	"invalid-auth-event": "Ocorreu um erro interno",
	"invalid-verification-code": "",
	"invalid-cordova-configuration":
		"Os seguintes plugins Cordova devem ser instalados para habilitar o OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappflugin-inapbrowser e cordova-plugin-customurlscheme",
	"invalid-custom-token":
		"O formato de token personalizado está incorreto. Por favor, verifique a documentação.",
	"invalid-email": "O endereço de e-mail está mal formatado.",
	"invalid-api-key":
		"Sua chave API é inválida, por favor, verifique se você a copiou corretamente.",
	"invalid-credential":
		"A credencial automática fornecida está mal formatada ou expirou.",
	"invalid-message-payload":
		"O modelo de e-mail correspondente a esta ação contém caracteres inválidos em sua mensagem. Por favor, corrija indo para a seção Auth email templates no Firebase Console.",
	"invalid-oauth-provider":
		"EmailAuthProvider não é suportado para esta operação. Esta operação suporta apenas provedores OAuth.",
	"unauthorized-domain":
		"Este domínio não é autorizado para operações OAuth para o seu projeto Firebase. Edite a lista de domínios autorizados do console do Firebase.",
	"invalid-action-code":
		"O código de ação é inválido. Isto pode acontecer se o código estiver mal formado, expirar ou já tiver sido usado.",
	"wrong-password": "A senha é inválida ou o usuário não tem uma senha.",
	"invalid-identifier-number": "",
	"invalid-recipient-email":
		"O e-mail correspondente a esta ação não enviou como o endereço de e-mail do destinatário fornecido é inválido.",
	"invalid-sender":
		"O modelo de e-mail correspondente a esta ação contém um e-mail ou nome do remetente inválido. Por favor, corrija indo para a seção Auth email templates no Firebase Console.",
	"invalid-verification-id": "",
	"missing-iframe-start": "Ocorreu um erro interno.",
	"auth-domain-config-required":
		"Certifique-se de incluir authDomain ao chamar o Firebase. initializeApp(), seguindo as instruções no console do Firebase.",
	"missing-app-credential": "",
	"missing-verification-code": "",
	"missing-identifier-number": "",
	"missing-verification-id": "",
	"app-deleted": "Esta instância do FirebaseApp foi excluída.",
	"account-exists-with-different-credential":
		"Já existe uma conta com o mesmo endereço de e-mail, mas com credenciais de login diferentes.",
	"network-request-failed":
		"Ocorreu um erro na rede (como timeout, conexão interrompida ou host inalcançável).",
	"no-auth-event": "Ocorreu um erro interno.",
	"no-such-provider":
		"O usuário não foi vinculado a uma conta com o provedor fornecido.",
	"operation-not-allowed":
		"O provedor fornecido está desabilitado para este projeto Firebase. Habilite-o no console do Firebase, na aba método de login da seção Auth.",
	"operation-not-supported-in-this-environment":
		"Esta operação não é suportada no ambiente em que esta aplicação está rodando. \\O 'location.protocol' deve ser http, https ou chrome-extension e o armazenamento web deve estar habilitado.",
	"popup-blocked":
		"Incapaz de estabelecer uma conexão com o popup. Pode ter sido bloqueada pelo navegador.",
	"popup-closed-by-user":
		"O popup foi fechado pelo usuário antes de finalizar a operação",
	"provider-already-linked":
		"O usuário só pode ser vinculado a uma identidade para o provedor dado",
	"quota-exceeded": "",
	"redirect-cancelled-by-user":
		"A operação de redirecionamento foi cancelada pelo usuário antes de finalizar",
	"redirect-operation-pending":
		"Uma operação de redirecionamento de login já está pendente",
	timeout: "A operação foi expirada",
	"user-token-expired":
		"A credencial do usuário não é mais válida. O usuário deve fazer o login novamente.",
	"too-many-requests":
		"Bloqueamos todas as solicitações deste dispositivo devido a atividade incomum. Tente novamente mais tarde.",
	"user-cancelled":
		"O usuário não concedeu a sua solicitação as permissões que solicitou.",
	"user-not-found":
		"Não há nenhum registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.",
	"user-disabled": "A conta do usuário foi desabilitada por um administrador.",
	"user-mismatch":
		"As credenciais fornecidas não correspondem ao usuário previamente cadastrado.",
	"user-signed-out": "",
	"weak-password": "A senha deve ter 6 caracteres ou mais.",
	"web-storage-unsupported":
		"Este navegador não é suportado ou cookies e dados de terceiros podem ser desabilitados.",
};
