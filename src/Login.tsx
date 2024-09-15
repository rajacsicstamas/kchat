import "./Login.less"
import { useState } from "preact/hooks";
import { TextInput } from "./TextInput";
import { chatService } from "./ChatService";
export function Login()
{
	let [ email, setEmail ] = useState( "" );
	let [ password, setPassword ] = useState( "" );
	let [ displayName, setDisplayName ] = useState( "" );
	let [ register, setRegister ] = useState( false );

	function loginRegister()
	{
		if ( register )
			chatService.send( { type: "register", email, password, displayName, staySignedIn: true } );
		else
			chatService.send( { type: "login", email, password, staySignedIn: true } );
	}


	return <div class="Login">
		<span class="logo" onClick={ () =>
		{
			document.documentElement.classList.toggle( "theme-light" );
			localStorage[ "theme" ] = document.documentElement.classList.contains( "theme-light" ) ? "light" : "";
		} }>🗪</span>
		<TextInput type="email" placeholder="Email (someone@example.com)" value={ email } onChange={ setEmail } autofocus />
		<TextInput type="password" placeholder="Password" value={ password } onChange={ setPassword } onEnter={ loginRegister } />
		{ register && <TextInput type="text" placeholder="Display Name (Agent Smith)" value={ displayName } onChange={ setDisplayName } /> }
		<button type="button" onClick={ loginRegister }>
			<span class="material-symbols-outlined">
				login
			</span>
			{ register ? "Register" : "Login" }
		</button>
		<p>{ register ? "Switch back to " : "Have no account yet? Go and " }
			<a href="" onClick={ e =>
			{
				e.preventDefault();
				setRegister( !register );
			} }>
				{ register ? "Login" : "Register" }
			</a>
		</p>
	</div>
}
