import React from "react";
import { Interweave } from "interweave";
import {
	IpMatcher,
	UrlMatcher,
	EmailMatcher,
	HashtagMatcher,
} from "interweave-autolink";

const Interweavedocs = () => {
	return (
		<div>
			<h1>Interweavedocs</h1>
			<br />
			<br />
			<Interweave
				content='This contains a URL, https://github.com/milesj/interweave, and a hashtag, #interweave, that will be converted to an anchor link!'
				matchers={[new UrlMatcher("url"), new HashtagMatcher("hashtag")]}
			/>
			;
		</div>
	);
};

export default Interweavedocs;
