import Head from "next/head";
import { TimeHTMLAttributes, FC, RefCallback, useCallback, useState } from "react";

export type Props = {
	locale?: string;
	datetime: string | number | Date;
	localeMatcher?: "best fit" | "lookup";
	weekday?: "long" | "short" | "narrow";
	era?: "long" | "short" | "narrow";
	year?: "numeric" | "2-digit";
	month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
	day?: "numeric" | "2-digit";
	hour?: "numeric" | "2-digit";
	minute?: "numeric" | "2-digit";
	second?: "numeric" | "2-digit";
	timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric";
	formatMatcher?: "best fit" | "basic";
	hour12?: boolean;
	timeZone?: string;
	calendar?: string;
	dayPeriod?: "narrow" | "short" | "long";
	numberingSystem?: string;
	dateStyle?: "full" | "long" | "medium" | "short";
	timeStyle?: "full" | "long" | "medium" | "short";
	hourCycle?: "h11" | "h12" | "h23" | "h24";
	timeProps?: TimeHTMLAttributes<HTMLTimeElement>;
};

const REGEX_WHITE_SPACE = /\s+/g;

export const NextTime: FC<Props> = (props) => {
	const [date, setDate] = useState<Date | undefined>();
	const [formattedDate, setFormattedDate] = useState<string>();
	const isoDate = date?.toISOString();

	const computeTimeRef: RefCallback<HTMLTimeElement> = useCallback(
		(node) => {
			if (node) {
				const renderedDate = node.getAttribute("datetime");
				const _date = computedDate(renderedDate);
				setDate(_date);

				const locale = node?.getAttribute("data-locale");
				const _formattedDate = new Intl.DateTimeFormat(locale ?? props.locale, props).format(date);
				setFormattedDate(_formattedDate);
			}
		},
		[date],
	);

	function computedDate(renderedDate: string | null) {
		if (renderedDate) return new Date(renderedDate);
		if (!props.datetime) return new Date();
		return new Date(props.datetime);
	}

	return (
		<>
			<Head key="next-time">
				<script>
					{`
            document.querySelectorAll('time[data-n-time]').forEach(el => {
              const date = new Date(el.getAttribute('datetime'));
              const options = {};
              for (const name of el.getAttributeNames()) {
                if (name.startsWith('data-')) {
                  options[name.slice(5)] = el.getAttribute(name);
                }
              }
              const formatter = new Intl.DateTimeFormat(options.locale, options);
              el.textContent = formatter.format(date)
            })
          `.replace(REGEX_WHITE_SPACE, " ")}
				</script>
			</Head>
			<time ref={computeTimeRef} data-n-time datetime={isoDate} {...props.timeProps}>
				{formattedDate}
			</time>
		</>
	);
};
