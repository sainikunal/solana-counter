use anchor_lang::prelude::*;

declare_id!("4czQLEmBScpEwEGK9ZSPbYCDR382MmqdsrPufmpMVsZB");

#[program]
pub mod solana_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count -= 1;
        Ok(())
    }
}


#[account]
pub struct Counter {
    pub count: u64
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = Counter::SPACE)]
    pub counter: Account<'info, Counter>,

    #[account(mut)]
    pub user: Signer<'info>,
    
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>
}

impl Counter {
    pub const SPACE: usize = 8 + std::mem::size_of::<Self>();
}

// // export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
// // export ANCHOR_WALLET=~/.config/solana/id.json