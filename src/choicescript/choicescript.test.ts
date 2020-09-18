import { testTokenization } from '../test/testRunner';

testTokenization('choicescript', [
	// Comments
	[
		{
			line: '*comment me out',
			tokens: [{ startIndex: 0, type: 'comment.choicescript' }]
		}
	],
	[
		{
			line: '    *comment indent still valid',
			tokens: [{ startIndex: 0, type: 'comment.choicescript' }]
		}
	],
	[
		{
			line: '\t*comment with tabs still valid',
			tokens: [{ startIndex: 0, type: 'comment.choicescript' }]
		}
	]
]);
