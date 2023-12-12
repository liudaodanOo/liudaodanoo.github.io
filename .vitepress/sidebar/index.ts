import BackendSidebar from './backend';
import FrontendSidebar from './frontend';
import DigiwinSidebar from './digiwin';

export default {
	...FrontendSidebar,
	...BackendSidebar,
	...DigiwinSidebar,
};
