/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { registerLanguage, registerTheme } from '../_.contribution';
import { darkTheme, lightTheme } from './choicescript';

// Allow for running under nodejs/requirejs in tests
const _monaco: typeof monaco = (typeof monaco === 'undefined' ? (<any>self).monaco : monaco);

registerLanguage({
	id: 'choicescript',
	extensions: ['.txt'],
	aliases: ['ChoiceScript', 'cs'],
	loader: () => _monaco.Promise.wrap(import('./choicescript'))
});

// Automatically load themes
registerTheme("cs-dark", darkTheme);
registerTheme("cs-light", lightTheme);
