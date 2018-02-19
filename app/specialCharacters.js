module.exports = [
    {
        label: 'Perusmerit ja kreikkalaiset aakkoset',
        characters: [
            { character: '°', popular: true },
            { character: '·', latexCommand: '\\cdot', popular: true },
            { character: '±', latexCommand: '\\pm', popular: true },
            { character: '∞', latexCommand: '\\infty', popular: true },
            { character: '²', latexCommand: '^2', popular: true },
            { character: '³', latexCommand: '^3', popular: true },
            { character: '½', latexCommand: '1/2', popular: true },
            { character: '⅓', latexCommand: '1/3', popular: true },
            { character: 'π', latexCommand: '\\pi', popular: true },
            { character: 'α', latexCommand: '\\alpha', popular: true },
            { character: 'β', latexCommand: '\\beta', popular: true  },
            { character: 'Γ', latexCommand: '\\Gamma' },
            { character: 'γ', latexCommand: '\\gamma' },
            { character: 'Δ', latexCommand: '\\Delta' },
            { character: 'δ', latexCommand: '\\delta' },
            { character: 'ε', latexCommand: '\\varepsilon' },
            { character: 'ζ', latexCommand: '\\zeta' },
            { character: 'η', latexCommand: '\\eta' },
            { character: 'Θ', latexCommand: '\\Theta' },
            { character: 'ϑ', latexCommand: '\\vartheta' },
            { character: '&iota;', latexCommand: '\\iota' },
            { character: 'κ', latexCommand: '\\kappa' },
            { character: 'Λ', latexCommand: '\\Lambda' },
            { character: 'λ', latexCommand: '\\lambda' },
            { character: 'µ', latexCommand: '\\mu' },
            { character: 'Ξ', latexCommand: '\\Xi' },
            { character: 'ξ', latexCommand: '\\xi' },
            { character: '∏', latexCommand: '\\Pi' },
            { character: 'ρ', latexCommand: '\\rho' },
            { character: '∑', latexCommand: '\\Sigma' },
            { character: 'σ', latexCommand: '\\sigma' },
            { character: 'τ', latexCommand: '\\tau' },
            { character: 'Υ', latexCommand: '\\Upsilon' },
            { character: 'υ', latexCommand: '\\upsilon' },
            { character: 'Φ', latexCommand: '\\Phi' },
            { character: 'Ф', latexCommand: '\\phi' },
            { character: 'χ', latexCommand: '\\chi' },
            { character: 'Ψ', latexCommand: '\\Psi' },
            { character: 'ψ', latexCommand: '\\psi' },
            { character: 'Ω', latexCommand: '\\Omega' },
            { character: 'ω', latexCommand: '\\omega' },
            { character: '∂', latexCommand: '\\partial' },
            { character: 'φ', latexCommand: '\\varphi' }
        ]
    },
    {
        label: 'Algebra',
        characters: [
            { character: '≠', latexCommand: '\\neq', popular: true },
            { character: '≈', latexCommand: '\\approx', popular: true },
            { character: '≤', latexCommand: '\\leq', popular: true },
            { character: '≥', latexCommand: '\\geq' },
            { character: '<' },
            { character: '>' },
            { character: '∼', latexCommand: '\\sim' },
            { character: '≡', latexCommand: '\\equiv' },
            { character: '≢' }, // \nequiv or \not\equiv
            { character: '∘', latexCommand: '\\circ' },
            { character: '…', latexCommand: '\\ldots' },
            { character: '∝', latexCommand: '\\propto' }
        ]
    },
    {
        label: 'Geometria ja vektorioppi',
        characters: [
            { character: '∢', popular: true },
            { character: '→', latexCommand: '\\rightarrow', popular: true },
            { character: '⇅', popular: true  },
            { character: '∠', latexCommand: '\\angle' },
            { character: '↑', latexCommand: '\\uparrow' },
            { character: '↓', latexCommand: '\\downarrow' },
            { character: '↔', latexCommand: '\\leftrightarrow' },
            { character: '⊥', latexCommand: '\\perp'},
            { character: '‖', latexCommand: '\\parallel'},
            { character: '⇌' }, // \rightleftharpoons
            { character: '|' , latexCommand: '\\mid'} // \pipe
        ]
    },
    {
        label: 'Logiikka ja joukko-oppi',
        characters: [
            { character: '⇒', latexCommand: '\\Rightarrow', popular: true },
            { character: '⇔', latexCommand: '\\Leftrightarrow', popular: true },
            { character: '∃', latexCommand: '\\exists', popular: true },
            { character: '∀', latexCommand: '\\forall', popular: true },
            { character: 'ℝ', popular: true },
            { character: 'ℕ' },
            { character: 'ℤ' },
            { character: 'ℚ' },
            { character: '∩', latexCommand: '\\cap' },
            { character: '∪', latexCommand: '\\cup' },
            { character: '∖', latexCommand: '\\setminus' },
            { character: '⊂', latexCommand: '\\subset' },
            { character: '⊄', latexCommand: '\\notsubset' },
            { character: '∈', latexCommand: '\\in' },
            { character: '∉', latexCommand: '\\notin' },
            { character: '∅', latexCommand: '\\empty' },
            { character: '∧', latexCommand: '\\and' },
            { character: '∨', latexCommand: '\\or' },
            { character: '¬' }
        ]
    }
]
